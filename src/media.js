let forStorage = (media, mediaId, url) => {
  return {
    _id: media.mediaId ? media.mediaId : mediaId, //eslint-disable-line no-underscore-dangle
    unitId: media.unitId,
    fileName: media.fileName,
    title: media.title,
    description: media.description,
    isDefault: media.isDefault,
    categories: media.categories,
    order: media.order,
    url: media.url ? media.url : url
  };
};

let fromStorage = (media) => {
  return {
    mediaId: media._id, //eslint-disable-line no-underscore-dangle
    unitId: media.unitId,
    fileName: media.fileName,
    title: media.title,
    description: media.description,
    isDefault: media.isDefault,
    categories: media.categories,
    order: media.order,
    url: media.url
  };
};

module.exports = {
  forStorage,
  fromStorage
};
