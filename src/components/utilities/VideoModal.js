import React from "react";

export const VideoModal = () => {
    return (
        <div
            className="modal fade"
            id="modal-video-01"
            tabIndex="-1"
            role="dialog"
            aria-hidden="true">
            <div className="modal-dialog" role="document" data-dismiss="modal">
                <div
                    className="close-mo-video-01 trans-0-4"
                    data-dismiss="modal"
                    aria-label="Close">
                    &times;
            </div>

                <div className="wrap-video-mo-01">
                    <div className="w-full wrap-pic-w op-0-0">
                        <img src="images/icons/video-16-9.jpg" alt="IMG" />
                    </div>
                    <div className="video-mo-01">
                        <iframe
                            title="Video"
                            src="https://www.youtube.com/embed/Nt8ZrWY2Cmk?rel=0&amp;showinfo=0"
                            allowFullScreen
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoModal;
