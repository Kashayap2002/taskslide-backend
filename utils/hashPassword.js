const bcrypt = require('bcryptjs');

(async () => {
    const hashedPassword = await bcrypt.hash('12345', 10); // Replace '12345' with your plain password
    console.log(hashedPassword); // Copy this hash and use it in the database
})();
