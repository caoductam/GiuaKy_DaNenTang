import React from 'react';
import NoteItem from './NoteItem';

const NotesList = ({ notes, onAddNote, onDeleteNote, onEditNote, isLoading }) => {
  return (
    <div className="notes-list-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">📝 My Notes</h1>
          <p className="app-subtitle">Ghi chú cá nhân của bạn</p>
        </div>
      </header>

      {/* Content */}
      <main className="main-content">
        {isLoading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Đang tải ghi chú...</p>
          </div>
        ) : notes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>Chưa có ghi chú nào</h3>
            <p>Nhấn nút + bên dưới để thêm ghi chú đầu tiên của bạn</p>
          </div>
        ) : (
          <div className="notes-container">
            <div className="notes-header">
              <span className="notes-count">
                Tổng số: <strong>{notes.length}</strong> ghi chú
              </span>
            </div>
            
            <div className="notes-grid">
              {notes.map(note => (
                <NoteItem
                  key={note.id}
                  note={note}
                  onDelete={onDeleteNote}
                  onEdit={onEditNote}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <button
        onClick={onAddNote}
        className="fab"
        title="Thêm ghi chú mới"
      >
        <span className="fab-icon">+</span>
      </button>
    </div>
  );
};

export default NotesList;