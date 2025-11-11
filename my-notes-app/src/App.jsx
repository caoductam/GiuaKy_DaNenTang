import React, { useState, useEffect } from 'react';
import NotesList from './components/NotesList';
import AddEditNote from './components/AddEditNote';
import { StorageService } from './services/storage';
import './App.css';

function App() {
  const [screen, setScreen] = useState('list');
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingNote, setEditingNote] = useState(null);

  // Load notes khi app khởi động
  useEffect(() => {
    loadNotes();
  }, []);

  /**
   * Tải danh sách ghi chú từ storage
   */
  const loadNotes = async () => {
    setIsLoading(true);
    try {
      const loadedNotes = await StorageService.getNotes();
      setNotes(loadedNotes);
    } catch (error) {
      console.error('Error loading notes:', error);
      alert('Có lỗi xảy ra khi tải ghi chú!');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Chuyển sang màn hình thêm ghi chú mới
   */
  const handleAddNote = () => {
    setEditingNote(null);
    setScreen('add');
  };

  /**
   * Chuyển sang màn hình sửa ghi chú
   */
  const handleEditNote = (note) => {
    setEditingNote(note);
    setScreen('add');
  };

  /**
   * Lưu ghi chú (thêm mới hoặc cập nhật)
   */
  const handleSaveNote = async (content) => {
    try {
      if (editingNote) {
        await StorageService.updateNote(editingNote.id, content);
      } else {
        await StorageService.saveNote(content);
      }
      await loadNotes();
      setScreen('list');
      setEditingNote(null);
    } catch (error) {
      throw error;
    }
  };

  /**
   * Xóa ghi chú
   */
  const handleDeleteNote = async (id) => {
    const confirmed = window.confirm(
      '⚠️ Bạn có chắc chắn muốn xóa ghi chú này?\nHành động này không thể hoàn tác!'
    );
    
    if (confirmed) {
      try {
        await StorageService.deleteNote(id);
        await loadNotes();
      } catch (error) {
        alert('❌ Có lỗi xảy ra khi xóa ghi chú!');
      }
    }
  };

  /**
   * Quay lại màn hình danh sách
   */
  const handleBack = () => {
    setScreen('list');
    setEditingNote(null);
  };

  return (
    <div className="app">
      {screen === 'list' ? (
        <NotesList
          notes={notes}
          onAddNote={handleAddNote}
          onDeleteNote={handleDeleteNote}
          onEditNote={handleEditNote}
          isLoading={isLoading}
        />
      ) : (
        <AddEditNote
          onBack={handleBack}
          onSave={handleSaveNote}
          editingNote={editingNote}
        />
      )}
    </div>
  );
}

export default App;