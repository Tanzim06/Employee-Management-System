package com.emBackEnd.emBackend.controller;


import com.emBackEnd.emBackend.exception.ResourceNotFoundException;
import com.emBackEnd.emBackend.model.Employee;
import com.emBackEnd.emBackend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins ="http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping("/employees")
    public List<Employee> getAllEmployee(){
        return employeeRepository.findAll();
    }
    @PostMapping("/employees")
    public Employee createEmployee(@RequestBody Employee employee){
        return employeeRepository.save(employee);
    }

    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id){
        Employee employee= employeeRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Employee not found with id :"+ id));
        return ResponseEntity.ok(employee);
    }

    @PutMapping("/employees/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails ){

        Employee employee= employeeRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Employee not found with id :"+ id));

        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setEmail(employeeDetails.getEmail());

        Employee updatedEmployee= employeeRepository.save(employee);
        return ResponseEntity.ok(updatedEmployee);
    }

    @DeleteMapping("/employees/{id}")
    public  ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){

        Employee employee= employeeRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Employee not found with id :"+ id));

        employeeRepository.delete(employee);
        Map<String, Boolean> response= new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
