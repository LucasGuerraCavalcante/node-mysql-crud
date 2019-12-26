
module.exports = {

    // Load home page

    getHomePage: (req, res) => {

        let query = 'SELECT * FROM employees ORDER BY name LIMIT 1;'; 

        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                employees: result
            });
        }); 
    },    

    getEmployee: (req, res) => {
        
        var name = req.query.name;

        if (name) {

            let query = `SELECT * FROM employees WHERE name like "${nome}%" LIMIT 1;`; 
    
            db.query(query, (err, result) => {
                if (err) {
                    res.redirect('/');
                }
                res.render('index.ejs', {
                    employees: result
                });
            });
        }
    },

    deleteEmployee: (req, res) => {

        var registration = req.query.matricula;

        let query = `DELETE FROM employees WHERE registration = "${registration}" LIMIT 1;`;  

        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                employees: result
            });
        });
    },

    updateEmployee: (req, res) => {

        var name = req.query.name;
        var branch = req.query.branch;
        var registration = req.query.registration;
        var role = req.query.role;

        let query = `UPDATE employees SET name = "${name}", branch = "${branch}", registration = "${registration}", role = "${role}" WHERE registration = "${registration}";`;
        let query2 = `SELECT  * FROM employees WHERE name like "${name}%" LIMIT 1;`;              

        db.query(query, (err, result) => {

            if (err) {
                res.redirect('/');
            }

            db.query(query2, (err, result) => {
                if (err) {
                    res.redirect('/');
                }
                res.render('index.ejs', {
                    employees: result
                });
            })
        });
    },

    registerEmployee: (req, res) => {

        var name = req.query.name;
        var branch = req.query.branch;
        var registration = req.query.registration;
        var role = req.query.role;

        let query = `SELECT  registration FROM employees WHERE registration = "${registration}" LIMIT 1;`;   
        let query2 = `INSERT INTO employees (name, branch, registration, role) VALUES ("${name}","${branch}","${registration}","${role}");`;           
        let query3 = `SELECT  * FROM employees WHERE registration = "${registration}" LIMIT 1;`; 

        db.query(query, (err, result) => {

            // Array with the result of the first sql query

            const arrayToCheckIfItsExists = (Object.keys(result).length);

            if (err) {
                res.redirect('/');
            }

            // Checks if employee already exists by registration

            // If it exists 

            else if (arrayToCheckIfItsExists > 0) {

                db.query(query3, (err, result) => {

                    console.log(result)

                    if (err) {
                        res.redirect('/');
                    }
                    res.render('index.ejs', {
                        employees: result
                    });
                })

            // If not

            } else {

                // Register

                db.query(query2, (err, result) => {

                    if (err) {
                        res.redirect('/');
                    }

                    // Show new employee
    
                    db.query(query3, (err, result) => {

                        if (err) {
                            res.redirect('/');
                        }
                        res.render('index.ejs', {
                            employees: result
                        });
                    })
                })
            }
        });
    },
};

