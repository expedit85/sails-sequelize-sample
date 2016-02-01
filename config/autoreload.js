// It's not working. May be due to waterline was replaced by sequelize.
module.exports.autoreload = {
  active: true,
  usePolling: false,
  dirs: [
    "api/models",
    "api/controllers",
    "api/services",
    "config/locales"
  ],
  ignored: [
    // Ignore all files with .ts extension
    "**.ts"
  ]
};

