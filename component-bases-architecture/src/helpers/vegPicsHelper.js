export default 
{
    getImage : function ( name ) 
    {
        const context = require.context('@/assets/img', false, /\.(png|jpe?g|gif)$/),
        images = context.keys().map((key) => {           
                return {
                    src: context(key),
                    name: key.split('/').pop().replace('.jpg','').replace('.png','').replace('.jpeg',''),
                };
            });
        // eslint-disable-next-line
        
        let myImage = images.find(function ( image ) {
            return image.name === name;
        });
        return myImage;
    }

}
