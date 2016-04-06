let expect = require('chai').expect;
let transform = require('../src').images;

describe('Images transform', () => {
  let image;
  describe('for storage', () => {
    describe('with predefined url or imageId', () => {
      beforeEach(() => {
        image = {
          imageId: 'E1eCGWGB0l',
          unitId: '41ILk2qhg',
          fileName: '41ILk2qhg-E1eCGWGB0l.jpg',
          title: 'This is a title',
          description: 'This is a description',
          isDefault: false,
          categories: [
            '1',
            '2'
          ],
          order: 5,
          url: 'https://www.googleapis.com/download/storage/v1/b/ll-prd-media/o/41ILk2qhg-E1eCGWGB0l.jpg?generation=1459364350151000&alt=media'
        };
      });

      it('should keep the same url value of the image', () => {
        let transformedImage = transform.forStorage(image);
        expect(transformedImage.url).to.not.be.undefined;
        expect(transformedImage.url).to.eql(image.url);
      });

      it('should keep the same imageId and transform it to _id', () => {
        let transformedImage = transform.forStorage(image);
        expect(transformedImage._id).to.not.be.undefined;
        expect(transformedImage._id).to.eql(image.imageId);
        expect(transformedImage.imageId).to.be.undefined;
      });
    });

    describe('without predefined url or imageId', () => {
      beforeEach(() => {
        image = {
          unitId: '41ILk2qhg',
          fileName: '41ILk2qhg-E1eCGWGB0l.jpg',
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
      let imageId = 'E1eCGWGB0l';

      it('should add the url to the image if the url was not provided in the image object', () => {
        let transformedImage = transform.forStorage(image, imageId, url);
        expect(transformedImage.url).to.not.be.undefined;
        expect(transformedImage.url).to.be.eql(url);
      });

      it('should use the imageId provided and transform it to _id', () => {
        let transformedImage = transform.forStorage(image, imageId, url);
        expect(transformedImage._id).to.not.be.undefined;
        expect(transformedImage._id).to.eql(imageId);
        expect(transformedImage.imageId).to.be.undefined;
      });
    });
  });

  describe('from storage', () => {
    let image = {
      _id: 'E1eCGWGB0l',
      unitId: '41ILk2qhg',
      fileName: '41ILk2qhg-E1eCGWGB0l.jpg',
      title: 'This is a title',
      description: 'This is a description',
      isDefault: false,
      categories: [
        '1',
        '2'
      ],
      order: 5,
      url: 'https://www.googleapis.com/download/storage/v1/b/ll-prd-media/o/41ILk2qhg-E1eCGWGB0l.jpg?generation=1459364350151000&alt=media'
    };

    it('should turn _id into imageId with the same value', () => {
      let transformedImage = transform.fromStorage(image);

      expect(transformedImage.imageId).to.be.eql(image._id);
      expect(transformedImage._id).to.be.undefined;
    });
  });
});
