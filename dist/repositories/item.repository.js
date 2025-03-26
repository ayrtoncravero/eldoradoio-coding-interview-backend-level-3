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
exports.ItemRepository = void 0;
const Item_1 = require("../entity/Item");
const database_1 = require("../config/database");
class ItemRepository {
    constructor() {
        this.repository = database_1.AppDataSource.getRepository(Item_1.Item);
    }
    /**
     * Busca un item por su ID.
     * @param id - ID del item.
     * @returns El item encontrado o `null` si no existe.
     */
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findOne({ where: { id } });
        });
    }
    /**
     * Guarda un nuevo item en la base de datos.
     * @param item - Datos del nuevo item.
     * @returns El item guardado.
     */
    save(item) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.save(this.repository.create(item));
        });
    }
}
exports.ItemRepository = ItemRepository;
