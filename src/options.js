/*
 * Default KeepArray options
 * Set custom default options with KeepArray.options()
 */
module.exports = {
  // Directory of .json table files
  defaultPath: 'datastore',

  // Specifies whether connect() will create() when KeepArray not found
  connectCanCreate: true,

  // Minimum time (in seconds) between disk writes if array changed - debounce
  writeTime: 5,

  // Time (in seconds) before saving after a change - throttle
  delayTime: 1,

  // If true, use writeTime and delayTime, otherwise save every change immediately
  // True is recommended, for good performance
  loop: true,

  // Save all tables when program exiting
  saveOnExit: true,

  // Save all tables on unhandledExceptions and unhandledRejections
  saveOnCrash: false
}
