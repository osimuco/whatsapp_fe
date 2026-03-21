import React from 'react'
import { set } from 'react-hook-form';

function Picture({ readablePicture, setReadablePicture, setPicture }) {
    const [error, setError] = React.useState(""); // açıklama: resim yükleme sırasında oluşabilecek hataları göstermek için bir state oluşturuyoruz
    const inputRef = React.useRef(); // açıklama: dosya inputunu kontrol etmek için useRef hook'unu kullanıyoruz. Bu, kullanıcı dosya seçtiğinde input elementine erişmemizi sağlar.
    const handlePicture = (e) => {
        const file = e.target.files[0];
        if (file.type !== "image/png" && file.type !== "image/jpeg" && file.type !== "image/webp") {
            setError("Lütfen sadece PNG, JPEG veya WEBP formatındaki resimleri seçin.");
            return;
        }
        else if (file.size > 5 * 1024 * 1024) {
            setError("Lütfen 5MB'den küçük resimler seçin.");
            return;
        }
        else {
            setError("");
            setPicture(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setReadablePicture(e.target.result); // açıklama: FileReader kullanarak seçilen resmi okunabilir bir formata dönüştürüyoruz ve readablePicture state'ine atıyoruz. Bu, resmi kullanıcıya göstermek için kullanılır.
            };
        }

    };


    const handleChangePic = () => {
        setPicture("");
        setReadablePicture("");
    }

    return (
        <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
            <label htmlFor="picture" className="text-sm font-bold tracking-wide">
                Profil Fotoğrafı (Opsiyonel)
            </label>
            {readablePicture ? (
                <div>
                    <img
                        src={readablePicture}
                        alt="picture"
                        className="w-20 h-20 object-cover rounded-full"
                    />
                    <div
                        className="mt-2 w-20 py-1 dark:bg-dark_bg_3 rounded-md text-xs font-bold flex items-center justify-center cursor-pointer"
                        onClick={() => {
                            handleChangePic()
                        }}
                    >
                        Sil
                    </div>
                </div>
            ) : (
                <div
                    className="w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer"
                    onClick={() => inputRef.current.click()} // açıklama: kullanıcı "Yükle" butonuna tıkladığında dosya inputunu tetikliyoruz, böylece kullanıcı dosya seçebilir.
                >
                    Yükle
                </div>
            )}
            <input
                type="file"
                name="picture"
                id="picture"
                hidden
                ref={inputRef}
                accept="image/png,image/jpeg,image/webp"
                onChange={handlePicture}
            />
            <div className="mt-2">
                <p className="text-red-400">{error}</p>
            </div>
        </div>
    )
}

export default Picture
