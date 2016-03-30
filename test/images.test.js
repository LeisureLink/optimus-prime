let expect = require('chai').expect;
let transform = require('../src').images;

describe('Images transform', () => {
  describe('for storage', () => {
    let image = {
      imageId: 'E1eCGWGB0l',
      unitId: '41ILk2qhg',
      fileName: 'penny66.jpg',
      title: 'This is a title',
      description: 'This is a description',
      isDefault: false,
      categories: [
        '1',
        '2'
      ],
      order: 5,
      url: 'https://www.googleapis.com/download/storage/v1/b/ll-prd-media/o/41ILk2qhg-E1eCGWGB0l.jpg?generation=1459364350151000&alt=media',
      storageName: '41ILk2qhg-E1eCGWGB0l.jpg'
    };

    it('should turn imageId into _id with the same value', () => {
      let transformedImage = transform.forStorage(image);

      expect(transformedImage._id).to.be.eql(image.imageId);
      expect(transformedImage.imageId).to.be.undefined;
    });
  });

  describe('from storage', () => {
    let image = {
      _id: 'E1eCGWGB0l',
      unitId: '41ILk2qhg',
      fileName: 'penny66.jpg',
      title: 'This is a title',
      description: 'This is a description',
      isDefault: false,
      categories: [
        '1',
        '2'
      ],
      order: 5,
      url: 'https://www.googleapis.com/download/storage/v1/b/ll-prd-media/o/41ILk2qhg-E1eCGWGB0l.jpg?generation=1459364350151000&alt=media',
      storageName: '41ILk2qhg-E1eCGWGB0l.jpg'
    };

    it('should turn _id into imageId with the same value', () => {
      let transformedImage = transform.fromStorage(image);

      expect(transformedImage.imageId).to.be.eql(image._id);
      expect(transformedImage._id).to.be.undefined;
    });
  });
});
