import { Preferences } from '@capacitor/preferences';

const NOTES_KEY = 'my_notes';

export const StorageService = {
  /**
   * Lấy tất cả ghi chú từ storage
   * @returns {Promise<Array>} Mảng các ghi chú
   */
  async getNotes() {
    try {
      const { value } = await Preferences.get({ key: NOTES_KEY });
      return value ? JSON.parse(value) : [];
    } catch (error) {
      console.error('Error getting notes:', error);
      return [];
    }
  },

  /**
   * Lưu ghi chú mới
   * @param {string} content - Nội dung ghi chú
   * @returns {Promise<Object>} Ghi chú vừa được tạo
   */
  async saveNote(content) {
    try {
      const notes = await this.getNotes();
      const newNote = {
        id: Date.now().toString(),
        content: content.trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      notes.unshift(newNote);
      await Preferences.set({
        key: NOTES_KEY,
        value: JSON.stringify(notes)
      });
      return newNote;
    } catch (error) {
      console.error('Error saving note:', error);
      throw error;
    }
  },

  /**
   * Cập nhật ghi chú
   * @param {string} id - ID của ghi chú
   * @param {string} content - Nội dung mới
   * @returns {Promise<void>}
   */
  async updateNote(id, content) {
    try {
      const notes = await this.getNotes();
      const updatedNotes = notes.map(note => 
        note.id === id 
          ? { ...note, content: content.trim(), updatedAt: new Date().toISOString() } 
          : note
      );
      await Preferences.set({
        key: NOTES_KEY,
        value: JSON.stringify(updatedNotes)
      });
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  },

  /**
   * Xóa ghi chú
   * @param {string} id - ID của ghi chú cần xóa
   * @returns {Promise<void>}
   */
  async deleteNote(id) {
    try {
      const notes = await this.getNotes();
      const filteredNotes = notes.filter(note => note.id !== id);
      await Preferences.set({
        key: NOTES_KEY,
        value: JSON.stringify(filteredNotes)
      });
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  },

  /**
   * Xóa tất cả ghi chú
   * @returns {Promise<void>}
   */
  async clearAllNotes() {
    try {
      await Preferences.remove({ key: NOTES_KEY });
    } catch (error) {
      console.error('Error clearing notes:', error);
      throw error;
    }
  }
};