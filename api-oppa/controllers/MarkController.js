import models from '../models'
import resources from '../resources'
import fs from 'fs'
import path from 'path'

export default {
    register: async (req, res) => {
        try {
            if (req.files) {
                var img_path = req.files.portada.path;
                var name = img_path.split('/');
                var portada_name = name[2];
                req.body.imagen = portada_name;
            }
            const mark = await models.Mark.create(req.body);
            res.status(200).json(mark)
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un problema'
            });
            console.log(error);
        }
    },

    update: async (req, res) => {
        try {
            if (req.files && req.files.portada) {
                var img_path = req.files.portada.path;
                var name = img_path.split('/');
                var portada_name = name[2];
                //console.log(portada_name);
                req.body.imagen = portada_name;
            }
            await models.Mark.findByIdAndUpdate({ _id: req.body._id }, req.body);
            let MarkT = await models.Mark.findOne({ _id: req.body._id })
            res.status(200).json({
                message: "La marca se ha modificado correctamente",
                mark: resources.Mark.mark_list(MarkT),
            })
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un problema'
            });
            console.log(error);
        }
    },

    list: async (req, res) => {
        try {
            var search = req.query.search;
            let Marks = await models.Mark.find({
                $or: [
                    { "title": new RegExp(search, "i") },
                ]
            }).sort({ 'createdAt': -1 });

            Marks = Marks.map((user) => {
                return resources.Mark.mark_list(user);
            })

            res.status(200).json({
                marks: Marks
            })
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un problema'
            });
            console.log(error);
        }
    },
    remove: async (req, res) => {
        try {
            await models.Mark.findByIdAndDelete({ _id: req.query._id });
            res.status(200).json({
                message: "La marca se elimino correctamente",
            });
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un problema'
            });
            console.log(error);
        }
    },

    obtener_imagen: async (req, res) => {
        try {
            var img = req.params['img'];
            fs.stat('./upload/mark/' + img, function (err) {
                if (!err) {
                    let path_img = './upload/mark/' + img;
                    res.status(200).sendFile(path.resolve(path_img));
                } else {
                    let path_img = './upload/default.jpg';
                    res.status(200).sendFile(path.resolve(path_img));
                }
            })
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un problema'
            });
            console.log(error);
        }
    }
}