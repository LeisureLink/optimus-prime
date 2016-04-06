let forStorage = (image, imageId, url) => {
  return {
    _id: image.imageId ? image.imageId : imageId,
    unitId: image.unitId,
    fileName: image.fileName,
    title: image.title,
    description: image.description,
    isDefault: image.isDefault,
    categories: image.categories,
    order: image.order,
    url: image.url ? image.url : url
  }
};

let fromStorage = (image) => {
  return {
    imageId: image._id,
    unitId: image.unitId,
    fileName: image.fileName,
    title: image.title,
    description: image.description,
    isDefault: image.isDefault,
    categories: image.categories,
    order: image.order,
    url: image.url
  }
};

module.exports = {
  forStorage,
  fromStorage
};
