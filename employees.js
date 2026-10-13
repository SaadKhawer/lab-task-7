
const fs = require("fs");

const file = "employees.json";
const employees = JSON.parse(fs.readFileSync(file, "utf8"));

console.log("Existing employees:");
console.log(employees);

employees.push({
    id: Math.max(...employees.map(e => e.id)) + 1,
    name: "Hassan",
    department: "IT"
});

fs.writeFileSync(file, JSON.stringify(employees, null, 2));

console.log("Employee added successfully!");
console.log(employees);
