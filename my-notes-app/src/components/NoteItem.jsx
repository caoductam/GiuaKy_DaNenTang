import React from 'react';

const NoteItem = ({ note, onDelete, onEdit }) => {
  /**
   * Format ngày giờ theo định dạng Việt Nam
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  /**
   * Cắt ngắn nội dung nếu quá dài
   */
  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="note-item">
      <div className="note-content">
        <p>{truncateContent(note.content)}</p>
      </div>
      
      <div className="note-footer">
        <div className="note-date">
          <span className="date-icon">🕒</span>
          <span>{formatDate(note.createdAt)}</span>
          {note.updatedAt && note.updatedAt !== note.createdAt && (
            <span className="updated-badge">Đã sửa</span>
          )}
        </div>
        
        <div className="note-actions">
          <button
            onClick={() => onEdit(note)}
            className="btn-edit"
            title="Sửa ghi chú"
          >
            ✏️ Sửa
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="btn-delete"
            title="Xóa ghi chú"
          >
            🗑️ Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;