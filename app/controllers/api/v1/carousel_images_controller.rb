module Api
  module V1
    class CarouselImagesController < BaseController
      def index
        @carousel_images = CarouselImage.all
      end
    end
  end
end
