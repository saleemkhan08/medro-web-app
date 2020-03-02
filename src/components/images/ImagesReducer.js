import { CLOSE_IMAGE_UPLOAD_DIALOG, DELETE_IMAGE_SUCCESS, FETCH_IMAGES_BEGIN, FETCH_IMAGES_SUCCESS, HIDE_PRODUCT_IMAGE_GALLERY, IMAGE_UPLOAD_ERROR, IMAGE_UPLOAD_STARTED, IMAGE_UPLOAD_SUCCESS, OPEN_IMAGE_UPLOAD_DIALOG, SHOW_PRODUCT_IMAGE_GALLERY } from "./imagesActions";

const initialState = {
  images: [],
  isLoading: true,
  openUploadImgDialog: false,
  keywords: "",
  error: null,
  isUploading: false,
  refPath: undefined,
  currentIds: [],
  product: {},
  galleryImages: [],
  showGallery: false
};
const ImagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_PRODUCT_IMAGE_GALLERY:
      return {
        ...state,
        showGallery: true,
        galleryImages: action.payload
      };
    case HIDE_PRODUCT_IMAGE_GALLERY:
      return {
        ...state,
        showGallery: false,
        galleryImages: []
      };
    case OPEN_IMAGE_UPLOAD_DIALOG:
      return {
        ...state,
        openUploadImgDialog: true,
        product: action.payload
      };
    case CLOSE_IMAGE_UPLOAD_DIALOG:
      return {
        ...state,
        openUploadImgDialog: false
      };
    case IMAGE_UPLOAD_STARTED:
      return {
        ...state,
        isUploading: true
      };
    case IMAGE_UPLOAD_SUCCESS: {
      const tempImagesList = state.images;
      tempImagesList.unshift(action.payload);
      return {
        ...state,
        isUploading: false,
        images: tempImagesList
      };
    }
    case IMAGE_UPLOAD_ERROR:
      return {
        ...state,
        isUploading: false,
        error: action.payload
      };
    case FETCH_IMAGES_BEGIN:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_IMAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        images: action.payload
      };
    case DELETE_IMAGE_SUCCESS: {
      const tempImagesList = state.images;
      tempImagesList.splice(action.payload, 1);
      return {
        ...state,
        images: tempImagesList
      };
    }
    default:
      return state;
  }
};

export default ImagesReducer;
