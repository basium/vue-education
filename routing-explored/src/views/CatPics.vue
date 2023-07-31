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
                if( !this.images || this.images.length <= 0)
                {
                    return {src:""}
                }
                if(this.name.toLowerCase() === 'random')
                {
                   let rnd = Math.floor(Math.random() * this.images.length-1);
                   return this.images[rnd];
                }

                let image = this.images.find( function ( i ) {
                    return i.name.toLowerCase() === this.name.toLowerCase();
                }.bind( this ));

                if( image && image.src )
                    return image;
                else 
                    return {src:""}
            }
        },
        methods: {
            nextImage() {
                let currentImageIndex = this.images.indexOf(this.selectedImage)
                if (currentImageIndex < this.images.length - 1) {
                    currentImageIndex += 1;
                } else {
                    currentImageIndex = 0;
                }
                let imageName = this.images[currentImageIndex].name; 
                this.$router.push(`/CatPics/${imageName}`);
            },
            randomImage() {
                let currentImageIndex = Math.floor(Math.random() * this.images.length),
                imageName = this.images[currentImageIndex].name; 
                this.$router.push(`/CatPics/${imageName}`);
            }
        },
        beforeRouteEnter( to,from,next)
        {
            if(to.params && to.params.name && to.params.name.toLowerCase() === 'loui')
            {
                alert('Sorry, Loui is banned for being too destructive!')
               next('/error');
            }
            next();

        },
        beforeRouteUpdate( to,from,next)
        {
            
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
            if(to.name.toLowerCase() !== 'error')
            {
                alert("So sad to see you leave! We'll have better pics next time to keep you here FOREVER.");
            }
        }
        
    }
</script>