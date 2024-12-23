const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost', // MySQL is running locally
    user: 'root',      // Replace with your MySQL username
    password: 'Riyajha@2002', // Replace with your MySQL password
    database: 'taskslide', // Replace with your database name
    port: 3306 // Explicitly specifying the default MySQL port
});

module.exports = pool.promise();


/*TaskSlide/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
*/