import React from 'react';
import { Button } from 'react-bootstrap';

type FileType = File;

type Props = {
    imageUrl: string;
    onChange: (imageUrl: string) => void;
}

export function UploadImage({ imageUrl, onChange, ...props }: Props & Omit<React.HTMLProps<HTMLLabelElement>, 'onChange'>) {

    const beforeUpload = (file: FileType) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            alert('Вы можете загружать только JPG/PNG файлы!');
            return;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            alert('Картинка должна быть меньше 2 MB!');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                onChange(reader.result);
            }
        };
        reader.readAsDataURL(file);
    };

    const removeImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange('');
    }

    const uploadButton = (
        <div className="btn btn-outline-primary" style={{ border: 0 }}>
            <i className='icon'>add_a_photo</i>
            <div style={{ marginTop: 8 }}>Загрузить</div>
        </div>
    );

    const uploadedImage = (
        <div style={{ position: 'relative' }}>
            <img src={imageUrl} alt="avatar" style={{ width: '100%', maxWidth: '100px', height: 'auto' }} />
            <Button onClick={removeImage} variant="outline-danger" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <i className='icon'>delete</i>
            </Button>
        </div>
    )

    return (
        <label {...props}>
            <input
                style={{ display: 'none' }}
                type="file"
                accept="image/jpeg, image/png"
                onChange={(e) => {
                    const file = e.target.files && e.target.files[0];
                    if (file) {
                        beforeUpload(file);
                    }
                }}
            />
            {imageUrl ? uploadedImage : uploadButton}
        </label>
    );

}