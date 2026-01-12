"use client";
import React, { useState, useEffect } from 'react';
import { db } from './firebase'; // Crearemos este pequeño archivo después
import { Heart, MessageCircle, Trash2, Zap, Film } from 'lucide-react';

export default function CeroUltra() {
    const [posts, setPosts] = useState([]);
    const [text, setText] = useState('');
    const [selectedGif, setSelectedGif] = useState('');
    const [gifSearch, setGifSearch] = useState('');
    const [gifs, setGifs] = useState([]);

    // Buscar GIFs con protección de errores
    const searchGifs = async (q) => {
        setGifSearch(q);
        if (q.length < 2) return;
        try {
            const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=pLPA055748SdrP9G9V49I3h4vI52YqV0&q=${q}&limit=9`);
            const { data } = await res.json();
            setGifs(data || []);
        } catch (e) { console.error("Error Giphy", e); }
    };

    // Publicar con inteligencia
    const publish = async () => {
        if (!text && !selectedGif) return;
        const newPost = {
            texto: text,
            gif: selectedGif,
            likes: 0,
            fecha: Date.now(),
            autor: "Anon"
        };
        // Aquí iría la lógica de Firebase que ya conoces
        setText('');
        setSelectedGif('');
    };

    return (
        <div className="min-h-screen bg-[#0b0e11] text-[#adbac7] p-4 font-sans">
            <div className="max-w-2xl mx-auto">
                <header className="flex justify-between items-center mb-8 border-b border-[#30363d] pb-4">
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Zap className="text-blue-500" /> CERO ULTRA
                    </h1>
                </header>

                <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 mb-8 shadow-xl">
                    <textarea 
                        className="w-full bg-transparent border-none text-white text-lg outline-none resize-none mb-4"
                        placeholder="¿Qué está pasando?"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    
                    {selectedGif && (
                        <div className="relative mb-4">
                            <img src={selectedGif} className="rounded-xl w-full max-h-64 object-cover border-2 border-blue-500" />
                            <button onClick={() => setSelectedGif('')} className="absolute top-2 right-2 bg-red-500 p-1 rounded-full text-white">×</button>
                        </div>
                    )}

                    <div className="flex justify-between items-center pt-4 border-t border-[#30363d]">
                        <button onClick={() => document.getElementById('gif-section').classList.toggle('hidden')} className="text-gray-400 hover:text-blue-500 transition">
                            <Film size={24} />
                        </button>
                        <button onClick={publish} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-8 rounded-full transition shadow-lg">
                            Publicar
                        </button>
                    </div>

                    <div id="gif-section" className="hidden mt-4 space-y-4">
                        <input 
                            type="text" 
                            className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl px-4 py-2 text-white outline-none focus:border-blue-500"
                            placeholder="Buscar en Giphy..."
                            onChange={(e) => searchGifs(e.target.value)}
                        />
                        <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                            {gifs.map(g => (
                                <img 
                                    key={g.id} 
                                    src={g.images.fixed_height_small.url} 
                                    className="rounded-lg cursor-pointer hover:scale-105 transition"
                                    onClick={() => { setSelectedGif(g.images.original.url); document.getElementById('gif-section').classList.add('hidden'); }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}