const {PrismaClient} = require('@prisma/client')
const bcrypt = require('bcrypt');
const prisma = new PrismaClient;

let renderPageHome = async (req, res) => {
    try {
        let todoData = await prisma.todo.findMany({
            where: {
                userId: req.session?.data?.id
            }
        });
        res.render('home', { data: todoData })
    } catch (error) {
        console.log(error);
    }
}

let renderPageEdit = async (req, res) => {
    try {
        let { id } = req.params;
        let editData = await prisma.todo.findFirst({
            where: {
                id : parseInt(id)
            }
        })
        if (editData) {
            res.render('edit', {data: editData})
        }
    } catch (error) {
        console.log(error);
    }
}


let handleCreateTodo = async (req, res) => {
    try {
        let { judul, tanggal } = req.body;
        const submitToDatabase = await prisma.todo.create({
            data: {
                title: judul,
                isDone: false,
                createdAt: new Date(tanggal),
                updatedAt: new Date(tanggal),
                userId: req.session?.data?.id
            }
        })
        if (submitToDatabase) {
            res.redirect('/')
        }
    } catch (error) {
        console.log(error);
    }
}

let handleUpdateToDo = async (req, res) => {
    try {
        let {id} = req.params
        let { judul } = req.body
        const updateToDo = await prisma.todo.update({
            where: {
                id: parseInt(id)
            },
            data: {
                title:judul
            }
        });
        if (updateToDo) {
            res.redirect('/')
        }
    } catch (error) {
        console.log(error);
    }
}

let handleDeleteToDo = async (req, res) => {
    try {
        let { id } = req.params;
        let deleteFromDatabase = await prisma.todo.delete({
            where: {
                id : parseInt(id)
            }
        })
        if (deleteFromDatabase) {
            res.redirect('/')
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = {renderPageHome, renderPageEdit, handleCreateTodo, handleDeleteToDo, handleUpdateToDo}