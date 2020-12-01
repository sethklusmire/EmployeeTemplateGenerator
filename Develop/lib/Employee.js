// TODO: Write code to define and export the Employee class

const Engineer = require("./Engineer")
const Intern = require("./Intern")
const Manager = require("./Manager")

class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = Employee;
    }

    getName()
    getId()
    getEmail()
    getRole()

}