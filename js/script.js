const url = 'https://jsonplaceholder.typicode.com/users';

fetch(url).then(function (response) {
    return response.json();
}).then(function (result) {
    if (result.length) {
        let list = ``;
        for (let user of result) {
            list += `<div class="user-thumb" onclick="loadUser(${user.id})">`;
            list += `<div class="image"></div>`;
            list += `<div class="name">${user.name}</div>`;
            list += `<div class="website">${user.website}</div>`;
            list += `</div>`;
        }
        list += `<div class="user-thumb empty"></div>`;
        list += `<div class="user-thumb empty"></div>`;
        document.getElementById('list').innerHTML = list;
    }
});

function loadUser(id) {
    const modal = document.getElementById('modal');
    modal.classList.remove('hidden');
    fetch(url + '/' + id).then(function (response) {
        return response.json();
    }).then(function (result) {
        let data = ``;
        for (let i in result) {
            if (i !== 'id' && typeof result[i] !== 'object') {
                data += `<div class="line"><strong>${i.charAt(0).toUpperCase() + i.slice(1)}:</strong> ${result[i]}</div>`
            }
        }
        document.getElementById('info').innerHTML = data;

        document.getElementById('button-load-post').addEventListener('click', function () {
            document.getElementById('loader').style.display = 'inline-block';
            fetch('https://jsonplaceholder.typicode.com/posts?userId=' + id).then(function (response) {
                return response.json();
            }).then(function (result) {
                document.getElementById('loader').style.display = 'none';
                if (result.length) {
                    let list = ``;
                    for (let post of result) {
                        list += `<div class="item">`;
                        list += `<div class="caption">${post.title}</div>`;
                        list += `${post.body}`;
                        list += `</div>`;
                    }
                    document.getElementById('post-list').innerHTML = list;
                }
            }).catch(function (e) {
                document.getElementById('loader').style.display = 'none';
                console.error(e)
            });
        });
    });
}

function modalClose() {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
    document.getElementById('info').innerHTML = null;
    document.getElementById('post-list').innerHTML = null;
}