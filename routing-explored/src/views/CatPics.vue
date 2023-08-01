<template>
    <div class="catPics">
        <h1>Good to see you. </h1>
        <h2> have some cat pics.</h2>
        <img style="max-width:400px;" :src="selectedImage.src"/>
        <h3>{{name}}</h3>
        <button @click="nextImage">Next</button>
        <button @click="randomImage">Random</button>       
    </div>
</template>
<script>
    export default 
    {
        props: 
        {
            name : { default: "" },
            images : {default:null}
        },
        computed : { 
            selectedImage : function () 
            {
                /*When images or name changes */

                /* Check if the images array is populated. */
                if( !this.images || this.images.length <= 0)
                {
                    /* If not, we can't display anything so set the src path to empty. */
                    return {src:""}
                }
                /* Check if the name is a special keyword 'random' */
                if(this.name.toLowerCase() === 'random')
                {
                    /* If it is then simply select an image at random */
                   let rnd = Math.floor(Math.random() * this.images.length-1);
                   return this.images[rnd];
                }

                /* Otherwise try to find the specified image in the image set. */
                let image = this.images.find( function ( i ) {
                    return i.name.toLowerCase() === this.name.toLowerCase();
                }.bind( this ));

                /* If the image exists within our resources */
                if( image && image.src ){
                    /* return the image as the value of this computed. */
                    return image;
                }
                else 
                {
                    /* This is an invalid state, send the user to an error page.  */
                    this.$router.push(`/error`);
                }
            }
        },
        methods: {
            nextImage() {
                /* get the current index of the image that we are viewing from the images list */
                let currentImageIndex = this.images.indexOf(this.selectedImage)
                /* If this is not the last image */
                if (currentImageIndex < this.images.length - 1) {
                    /* Increment the current index to indicate the index of the next image we want to see */
                    currentImageIndex += 1;
                } else {
                    /* If it is the last one, set the next index to 0, to start from the first image.*/
                    currentImageIndex = 0;
                }
                /* Based on the new index. Get the corresponding image name from within the images list.*/
                let imageName = this.images[currentImageIndex].name; 
                /* Redirect the user to this page but with a different image name. */
                this.$router.push(`/CatPics/${imageName}`);
            },
            randomImage() {
                /* Simply select a random index from the available indexes (based on image length) */
                let currentImageIndex = Math.floor(Math.random() * this.images.length),
                imageName = this.images[currentImageIndex].name; 
                /* Redirect the user to this page but with a different image name.  */
                this.$router.push(`/CatPics/${imageName}`);
            }
        },
        beforeRouteEnter( to,from,next)
        {
            /* If the selected cat is Loui redirect to the error page */
            if(to.params && to.params.name && to.params.name.toLowerCase() === 'loui')
            {
                alert('Sorry, Loui is banned for being too destructive!')
               next('/error');
            }
            next();

        },
        beforeRouteUpdate( to,from,next)
        {
            /* If the selected cat is Loui redirect to the error page */
            if( to.params && to.params.name &&  to.params.name.toLowerCase() === 'loui')
            {
                alert('Sorry, Loui is banned for being too destructive!')
               next('/error');
            }
            next();

        },
        /* This is a component route guard. Will run whenever this component is visited. Or in this case when navigating away from this component. */
        beforeRouteLeave(to)
        {
            /* Only do this if the user is willngly leaving and not being forced to leave because of an error */
            if(to.name.toLowerCase() !== 'error')
            {
                alert("So sad to see you leave! We'll have better pics next time to keep you here FOREVER.");
            }
        }
        
    }
</script>