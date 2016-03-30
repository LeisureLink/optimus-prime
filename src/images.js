let forStorage = (image) => {
  return {
    _id: image.imageId,
    unitId: image.unitId,
    fileName: image.fileName,
    title: image.title,
    description: image.description,
    isDefault: image.isDefault,
    categories: image.categories,
    order: image.order,
    url: image.url,
    storageName: image.storageName
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
    url: image.url,
    storageName: image.storageName
  }
};

module.exports = {
  forStorage,
  fromStorage
};
