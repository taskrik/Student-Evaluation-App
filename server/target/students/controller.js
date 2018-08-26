"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const entity_1 = require("./entity");
const entity_2 = require("../batches/entity");
const entity_3 = require("../evaluations/entity");
let StudentController = class StudentController {
    async allStudents() {
        const students = await entity_1.Student.find();
        if (!students)
            throw new routing_controllers_1.NotFoundError('Sorry but that Table does not exist');
        return { students };
    }
    getStudents(id) {
        return entity_1.Student.findOne(id);
    }
    async createStudent(student, batchId) {
        const papa = await entity_2.Batch.findOne(batchId);
        if (papa instanceof entity_2.Batch)
            student.batch = papa;
        const entity = await student.save();
        const batch = await entity_2.Batch.findOne(papa.id);
        return { entity, batch };
    }
    async updateStudent(id, update) {
        const student = await entity_1.Student.findOne(id);
        if (!student)
            throw new routing_controllers_1.NotFoundError('Cannot find student');
        return entity_1.Student.merge(student, update).save();
    }
    async deleteStudent(studentId) {
        const student = await entity_1.Student.findOne(studentId);
        if (!student)
            throw new routing_controllers_1.NotFoundError('Sorry but that Student does not exist');
        const evaluations = await entity_3.Evaluation.find({ where: { student: student } });
        const papa = await entity_2.Batch.findOne({ where: { student: student } });
        if (!evaluations)
            throw new routing_controllers_1.NotFoundError('Sorry but that Student does not exist');
        await entity_3.Evaluation.remove(evaluations);
        await entity_1.Student.remove(student);
        const batch = await entity_2.Batch.findOne(papa.id);
        return { batch };
    }
};
__decorate([
    routing_controllers_1.Get('/students'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "allStudents", null);
__decorate([
    routing_controllers_1.Get('/students/:id([0-9]+)'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "getStudents", null);
__decorate([
    routing_controllers_1.Post('/students'),
    __param(0, routing_controllers_1.Body()),
    __param(1, routing_controllers_1.BodyParam('batchId', { required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.Student, String]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "createStudent", null);
__decorate([
    routing_controllers_1.Put('/students/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "updateStudent", null);
__decorate([
    routing_controllers_1.Delete('/students/:id([0-9]+)'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "deleteStudent", null);
StudentController = __decorate([
    routing_controllers_1.JsonController()
], StudentController);
exports.default = StudentController;
//# sourceMappingURL=controller.js.map