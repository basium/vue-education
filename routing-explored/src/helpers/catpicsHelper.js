export default 
{
    getImages : function () 
    {
        const context = require.context('@/assets/img', false, /\.(png|jpe?g|gif)$/),
        images = context.keys().map((key) => {           
                return {
                    src: context(key),
                    name: key.split('/').pop().replace('.jpg','').replace('.png',''),
                };
            });
        return images
    }

}
