var exec = require("child_process").exec;

// This function returns true if mongod is currently active
async function isActive() {
  var active = await new Promise((resolve, reject) => {
    exec("systemctl status mongod", function (err, stdout, stderr) {
      if (err) {
        console.warn(err);
      }
      resolve(stdout);
    });
  });
  try {
    active = active.split("\n")[2].split(":")[1].split(" ")[1] === "active";
  } catch {
    active = false;
  }
  return active;
}

exports.isActive = isActive;
