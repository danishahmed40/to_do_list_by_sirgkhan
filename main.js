#! /usr/bin/env node
import inquirer from "inquirer";
let todolist = [];
var condition = true;
let main = async () => {
    do {
        let menu_user = await inquirer.prompt([
            {
                name: "selected_menu",
                message: "enter the menue from the given choices",
                type: "list",
                choices: ["add_task", "update_task", "delete_task", "view_list"],
            },
        ]);
        if (menu_user.selected_menu === "add_task") {
            console.log("Adding Task menue");
            await toadd();
        }
        else if (menu_user.selected_menu === "update_task") {
            console.log("Update Task Menue");
            await toupdate();
        }
        else if (menu_user.selected_menu === "delete_task") {
            console.log("Delete Task Menue");
            await todelete();
        }
        else if (menu_user.selected_menu === "view_list") {
            console.log("View Task Menue");
            await view_task();
        }
        //run again
        let user_run = await inquirer.prompt([
            {
                name: "run",
                message: "do you want to run again",
                type: "confirm",
            },
        ]);
        if (user_run.run === true) {
            condition = true;
        }
        else {
            condition = false;
        }
    } while (condition);
};
//to view task function
let view_task = async () => {
    console.log("\n your to do list is here:");
    todolist.forEach((task, index) => {
        console.log(`${index}:${task}`);
    });
};
//to add task
let toadd = async () => {
    let add_task = await inquirer.prompt([
        {
            name: "task",
            message: "enter the task you want to add in the to do list",
            type: "input",
        },
    ]);
    todolist.push(add_task.task);
    await view_task();
};
//to update task
let toupdate = async () => {
    await view_task();
    let update_task = await inquirer.prompt([
        {
            name: "index",
            message: "enter the index of the task you want to update in the to do list",
            type: "input",
        },
        {
            name: "newtask",
            message: "enter the task you want to update in the to do list",
            type: "input",
        }
    ]);
    todolist[update_task.index] = (update_task.newtask);
    view_task();
};
// to delete task from the list
let todelete = async () => {
    await view_task();
    let delete_task = await inquirer.prompt([{
            name: "delindex",
            type: "input",
            message: "enter the index of the task you want to delete",
        },]);
    let deletedtask = todolist.splice(delete_task.delindex, 1);
    await view_task();
};
main();
