let expect = require('chai').expect;
let transform = require('../src').images;

describe('Images transform', () => {
  let image;
  describe('for storage', () => {
    it('should turn imageId into _id with the same value', () => {
      image = {
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

      let transformedImage = transform.forStorage(image);
      expect(transformedImage._id).to.be.eql(image.imageId);
      expect(transformedImage.imageId).to.be.undefined;
    });

    describe('with predefined url or storageName', () => {
      beforeEach(() => {
        image = {
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
      });

      it('should keep the same url value of the image', () => {
        let transformedImage = transform.forStorage(image);
        expect(transformedImage.url).to.not.be.undefined;
        expect(transformedImage.url).to.eql(image.url);
      });

      it('should keep the same storageName value of the image', () => {
        let transformedImage = transform.forStorage(image);
        expect(transformedImage.storageName).to.not.be.undefined;
        expect(transformedImage.storageName).to.eql(image.storageName);
      });
    });

    describe('without predefined url or storageName', () => {
      beforeEach(() => {
        image = {
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
          order: 5
        };
      });

      let url = 'https://www.googleapis.com/download/storage/v1/b/ll-prd-media/o/41ILk2qhg-E1eCGWGB0l.jpg?generation=1459364350151000&alt=media';
      let storageName = '41ILk2qhg-E1eCGWGB0l.jpg';

      it('should add the url to the image if the url was not provided in the image object', () => {
        let transformedImage = transform.forStorage(image, url, storageName);
        expect(transformedImage.url).to.not.be.undefined;
        expect(transformedImage.url).to.be.eql(url);
      });

      it('should add the storageName to the image if the storageName was not provided in the image object', () => {
        let transformedImage = transform.forStorage(image, url, storageName);
        expect(transformedImage.storageName).to.not.be.undefined;
        expect(transformedImage.storageName).to.be.eql(storageName);
      });
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
