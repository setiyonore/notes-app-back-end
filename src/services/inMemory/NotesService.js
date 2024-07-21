const { nanoid } = require('nanoid');
class NoteService {
    constructor() {
        this._notes = [];
    }

    addNote({ title, body, tags }) {
        const id = nanoid(16);
        const cretedAt = new Date().toString();
        const updatedAt = cretedAt;
        const newNote = {
            title, tags, body, id, cretedAt, updatedAt,
        };
        this._notes.push(newNote);
        const success = this._notes.filter((note) => note.id === id).length > 0;

        if (!success) {
            throw new Error('Catatan gagal ditambahkan')
        }
        return id;
    }

    getNotes() {
        return this._notes;
    }

    getNoteById(id) {
        const note = this._notes.filter((n) => n.id === id)[0];
        if (!note) {
            throw new Error('Catatan tidak ditemukan');
        }
        return note;
    }

    editNoteById(id, { title, body, tags }) {
        const index = this._notes.findIndex((note) => note.id === id);
        if (index === -1) {
            throw new Error('Gagal memperbarui catatan. Id tidak ditemukan');
        }

        const updatedAt = new Date().toISOString();

        this._notes[index] = {
            ...this._notes[index],
            title,
            body,
            tags,
            updatedAt,
        };
    }
    deleteNoteById(id) {
        const index = this._notes.findIndex((note) => note.id === id);
        if (index === -1) {
            throw new Error('Catatan gagal dihapus. Id tidak ditemukan');
        }

        this._notes.splice(index, 1);
    }
}
module.exports = NoteService;