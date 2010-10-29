var twTravel = require("tw-travel");

exports.ensureAdditionWorks = function(test) {
  test.assertEqual(twTravel.add(1, 1), 2, "1 + 1 = 2");
};
