"use client";

const VideoModal = ({ videoUrl, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="relative bg-white p-1 shadow-lg lg:w-[45%] lg-[90%]">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-[-10px] right-[-10px] bg-white text-black w-8 h-8 rounded-full cursor-pointer text-[24px] font-bold flex justify-center items-center"
                >
                    &times;
                </button>

                {/* Embedded YouTube Video */}
                <div className="aspect-w-16 aspect-h-9">
                    <iframe
                        width="100%"
                        height="315"
                        src={videoUrl}
                        title="YouTube video"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default VideoModal;
