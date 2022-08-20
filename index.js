/*
Desenvolvido por Roni Athayde 20/08 
São Paulo, SP - BR
*/
let db = firebase.firestore()
const postCollection = db.collection('todo');

document.querySelector('#postForm').addEventListener('submit', (event)=>{
    event.preventDefault();
    
    const titulo = document.querySelector('#titulo').value;
    const descricao = document.querySelector('#descricao').value;

    const post = {
        titulo: titulo,
        descricao: descricao      
    }

    postCollection.add(post);
    
    loadPosts()
})

function addPosts (post) {

    const postTemplate = `
    <article data-id="${post.id}" class="card mb-4">
                <div class="card-header">
                    <h5 class="card-title">${post.data().titulo}</h5>
                    <i data-remove="${post.id}" class="fa-solid fa-xmark delete"  ></i>
                </div>
                <div class="card-body">
                    <div class="card-text">${post.data().descricao}</div>
                </div>
            </article>
            `

    document.querySelector('#lista').innerHTML += postTemplate;

    document.querySelector('#titulo').value = ''
    document.querySelector('#descricao').value = ''
}

function loadPosts (){
    document.querySelector('#lista').innerHTML = "Carregando..."
    postCollection.get().then( snap =>{
        document.querySelector('#lista').innerHTML = ""
        snap.forEach( doc =>{
            
            addPosts(doc)                
        })
    })
} 

document.querySelector('#lista').addEventListener('click', e =>{
    const removeButtonId = e.target.dataset.remove;

    if(removeButtonId){
        const post = document.querySelector(`[data-id="${removeButtonId}"]`)

        post.remove()
        postCollection.doc(removeButtonId).delete().then( (doc)=> {
            loadPosts()
            console.log('post apagado')
        })
    }
    
})

loadPosts()