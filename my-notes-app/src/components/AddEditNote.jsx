import React, { useState, useEffect } from 'react';

const AddEditNote = ({ onBack, onSave, editingNote }) => {
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (editingNote) {
      setContent(editingNote.content);
      setCharCount(editingNote.content.length);
    }
  }, [editingNote]);

  const handleContentChange = (e) => {
    const value = e.target.value;
    setContent(value);
    setCharCount(value.length);
  };

  const handleSave = async () => {
    if (!content.trim()) {
      alert('⚠️ Vui lòng nhập nội dung ghi chú!');
      return;
    }

    setIsSaving(true);
    try {
      await onSave(content);
      setContent('');
      setCharCount(0);
    } catch (error) {
      alert('❌ Có lỗi xảy ra khi lưu ghi chú!');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (content.trim() && content !== editingNote?.content) {
      if (window.confirm('Bạn có thay đổi chưa lưu. Bạn có chắc muốn thoát?')) {
        onBack();
      }
    } else {
      onBack();
    }
  };

  return (
    <div className="add-edit-container">
      {/* Header */}
      <header className="add-edit-header">
        <button onClick={handleCancel} className="btn-back">
          ← Quay lại
        </button>
        <h1 className="page-title">
          {editingNote ? '✏️ Sửa ghi chú' : '➕ Thêm ghi chú mới'}
        </h1>
        <div style={{ width: '80px' }}></div>
      </header>

      {/* Content */}
      <main className="add-edit-content">
        <div className="editor-container">
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Nhập nội dung ghi chú của bạn..."
            className="note-textarea"
            autoFocus
          />
          
          <div className="editor-footer">
            <span className="char-count">
              {charCount} ký tự
            </span>
          </div>

          <div className="button-group">
            <button
              onClick={handleSave}
              disabled={isSaving || !content.trim()}
              className="btn-primary"
            >
              {isSaving ? '⏳ Đang lưu...' : editingNote ? '💾 Cập nhật' : '💾 Lưu ghi chú'}
            </button>
            <button
              onClick={handleCancel}
              className="btn-secondary"
              disabled={isSaving}
            >
              ❌ Hủy
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddEditNote;