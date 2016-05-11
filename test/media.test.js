let expect = require('chai').expect;
let transform = require('../src').media;

describe('Media Files transform', () => {
  let media;
  describe('for storage', () => {
    describe('with predefined url or mediaId', () => {
      beforeEach(() => {
        media = {
          mediaId: 'E1eCGWGB0l',
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

      it('should keep the same url value of the media file', () => {
        let transformedMedia = transform.forStorage(media);
        expect(transformedMedia.url).to.not.be.undefined;
        expect(transformedMedia.url).to.eql(media.url);
      });

      it('should keep the same mediaId and transform it to _id', () => {
        let transformedMedia = transform.forStorage(media);
        expect(transformedMedia._id).to.not.be.undefined; //eslint-disable-line no-underscore-dangle
        expect(transformedMedia._id).to.eql(media.mediaId); //eslint-disable-line no-underscore-dangle
        expect(transformedMedia.mediaId).to.be.undefined;
      });
    });

    describe('without predefined url or mediaId', () => {
      beforeEach(() => {
        media = {
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
      let mediaId = 'E1eCGWGB0l';

      it('should add the url to the media file if the url was not provided in the media file object', () => {
        let transformedMedia = transform.forStorage(å, mediaId, url);
        expect(transformedMedia.url).to.not.be.undefined;
        expect(transformedMedia.url).to.be.eql(url);
      });

      it('should use the mediaId provided and transform it to _id', () => {
        let transformedMedia = transform.forStorage(media, mediaId, url);
        expect(transformedMedia._id).to.not.be.undefined; //eslint-disable-line no-underscore-dangle
        expect(transformedMedia._id).to.eql(mediaId); //eslint-disable-line no-underscore-dangle
        expect(transformedMedia.mediaId).to.be.undefined;
      });
    });
  });

  describe('from storage', () => {
    let media = {
      _id: 'E1eCGWGB0l', //eslint-disable-line no-underscore-dangle
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

    it('should turn _id into mediaId with the same value', () => {
      let transformedMedia = transform.fromStorage(media);

      expect(transformedMedia.mediaId).to.be.eql(media._id); //eslint-disable-line no-underscore-dangle
      expect(transformedMedia._id).to.be.undefined; //eslint-disable-line no-underscore-dangle
    });
  });
});
