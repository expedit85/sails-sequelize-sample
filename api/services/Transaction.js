var co = require('co');


function Transaction(t) {
	this.transaction = t;
	this.status = Transaction.STATUS_ACTIVE;
	this.oldCommit = t.commit;
	this.oldRollback = t.rollback;

	Transaction.activeCount++;
}

Transaction.activeCount = 0;
Transaction.commitCount = 0;
Transaction.rollbackCount = 0;

Transaction.STATUS_ACTIVE = 1;
Transaction.STATUS_COMMITED = 2;
Transaction.STATUS_ROLLEDBACK = 3;

Transaction.override = function(t) {
	var tx = new Transaction(t);
	
	t.commit = function() {
		return tx.commit();
	};
	t.rollback = function() {
		return tx.rollback();
	};
	
	sails.log.debug('BEGIN TRANSACTION');
	return t;
}


Transaction.prototype.commit = function() {
	if (this.status != Transaction.STATUS_ACTIVE)
		return Promise.resolve(false);
		
	this.status = Transaction.STATUS_COMMITED;
	Transaction.activeCount--;
	Transaction.commitCount++;

	sails.log.debug('COMMIT');
	return this.oldCommit.call(this.transaction);
};

Transaction.prototype.rollback = function() {
	if (this.status != Transaction.STATUS_ACTIVE)
		return Promise.resolve(false);

	this.status = Transaction.STATUS_ROLLEDBACK;
	Transaction.activeCount--;
	Transaction.rollbackCount++;

	sails.log.debug('ROLLBACK');
	return this.oldRollback.call(this.transaction);
};


Transaction.cowrap = function txwrapper(gencb) {
	return co.wrap(function*(req, res) {
		try {
			var t = req.transaction = Transaction.override(yield sequelize.transaction());
			
			//console.log('res status',res.statusCode, res.headersSent);//200 false
			var result = yield co.wrap(gencb)(req, res);
		
			// console.log('res status',res.statusCode, res.headersSent);
			
			if (!res.headersSent) {
				throw new Error();	// 500 internal server error
			}
			else if (res.statusCode >= 400) {
				yield t.rollback();	// rolls back if not already rolled back
			}
			else yield t.commit();	// commits if not already commited
			
			return result;
		}
		catch (e) {
			if (req.transaction) {
				yield t.rollback();
				/*if (e instanceof ClientErrorException)
					return res[e.name].apply(res, e.args);
				else if (e instanceof Error)
					return res.serverError(e);*/
			}
			return res.serverError(e);
		}
		finally {
			sails.log.debug('Transaction:',
				'active:', Transaction.activeCount,
				'committed:', Transaction.commitCount,
				'rolled back:', Transaction.rollbackCount);
		}
	});
};


module.exports = Transaction;
