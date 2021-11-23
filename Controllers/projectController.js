const express = require('express');
const router = express.Router();
const Project = require('../Models/Projects');

router.get('/projects', (req, res) => {
    Project.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(projects => {
        res.render('Projects/projects', { projects: projects })
    })
})

router.get('/create-project', (req, res) => {
    res.render('Projects/createProject')
})

router.post('/create-project', (req, res) => {
    let name = req.body.name;
    let start = req.body.start;
    let end = req.body.end;
    let theme = req.body.theme;

    Project.findOne({ where:{ name: name } }).then(projects => {
        if(projects == undefined) {

            Project.create({
                name: name,
                start: start,
                end: end,
                theme: theme
            }).then(() => {
                res.status(200);
                res.send('<script>alert("Projeto cadastrado!"); window.location.href = "/projects"</script>');
            }).catch(() => {
                res.status(400);
                res.send('<script>alert("Erro ao cadastrar projeto!"); window.location.href = "/projects"</script>');
            })          
            
        } else {
            res.status(400);
            res.send('<script>alert("Projeto já cadastrado na base de dados!"); window.location.href = "/projects"</script>');
        }
    })
})

router.get('/edit-project/:id', (req, res) => {
    let id = req.params.id;

    if(!isNaN(id)) {

        Project.findByPk(id).then(project => {
            if(project != undefined) {
                res.render('Projects/editProject', { project: project })
            } else {
                res.redirect('/projects')
            }
        }).catch(() => {
            res.redirect('/projects');
        })
    } else {
        res.redirect('/projects');
    }
})

router.post('/update-project', (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let start = req.body.start;
    let end = req.body.end;
    let theme = req.body.theme;
    Project.update({ name: name, start: start, end: end, theme: theme }, {
        where:{
            id:id
        }
    }).then(() => {
        res.send("<script>alert('Projeto atualizado'); window.location.href = '/projects'; </script>")
    }).catch(() => {
        res.send("<script>alert('Erro ao atualizar projeto'); window.location.href = '/projects'; </script>")
    })
})

router.post('/delete-project', (req, res) => {
    let id = req.body.id;

    if(id != undefined) {
        if(isNaN(id)) {
            res.redirect('/projects');
        } else {
    
            Project.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.send("<script>alert('Projeto deletado!'); window.location.href = '/projects'; </script>")
            }).catch(() => {
                res.send("<script>alert('Erro ao deletar projeto!'); window.location.href = '/projects'; </script>")
            })
        }
    } else {
        res.send("<script>alert('Projeto não existe na base de dados!'); window.location.href = '/projects'; </script>")
    }
    
})

module.exports = router;