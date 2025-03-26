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
exports.ItemService = void 0;
class ItemService {
    constructor() {
        this.itemRepository = AppDataSource.getRepository(Item);
    }
    /**
     * Obtiene un item por su ID.
     * @param id - Identificador del item.
     * @returns El item encontrado o `null` si no existe.
     */
    getItemById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.itemRepository.findOne({ where: { id } });
        });
    }
    /**
     * Crea un nuevo item en la base de datos.
     * @param data - Datos del nuevo item.
     * @returns El item creado.
     */
    createItem(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newItem = this.itemRepository.create(data);
            return yield this.itemRepository.save(newItem);
        });
    }
}
exports.ItemService = ItemService;
;
