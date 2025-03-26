"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemController = void 0;
const item_service_1 = require("../services/item.service");
class ItemController {
    constructor() {
        this.itemService = new item_service_1.ItemService();
    }
    ;
    // Obtener todos los items
    // async getAll(req: Request, res: Response): Promise<Response> {
    //     try {
    //         const items = await this.itemRepository.find();
    //         return res.json(items);
    //     } catch (error) {
    //         console.error("Error fetching items:", error);
    //         return res.status(500).json({ message: "Internal Server Error" });
    //     }
    // }
    // // Obtener un item por ID
    // async getById(req: Request, res: Response): Promise<Response> {
    //     const { id } = req.params;
    //     try {
    //         const item = await this.itemRepository.findOne(id);
    //         if (!item) {
    //             return res.status(404).json({ message: "Item not found" });
    //         }
    //         return res.json(item);
    //     } catch (error) {
    //         console.error("Error fetching item:", error);
    //         return res.status(500).json({ message: "Internal Server Error" });
    //     }
    // }
    // Crear un nuevo item
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return console.log('Body: ', req.body);
            // TODO: Add validation
            // try {
            //     await this.itemRepository.save(item);
            //     return res.status(201).json(item);
            // } catch (error) {
            //     console.error("Error creating item:", error);
            //     return res.status(500).json({ message: "Internal Server Error" });
            // }
        });
    }
}
exports.ItemController = ItemController;
