let app = new Vue({
    el: '#app',
    data() {
        return {
            yourself: '',
            dialogueFrame: '',
            dialogue: '',
            text: '',
            myStyle: 'myStyle',
            otherStyle: 'otherStyle',
            dialogueFrame: '',
        }
    },
    beforeCreate() {
    }
    ,
    created() {
        var config = {
            apiKey: "AIzaSyDmoUs0roD2cIah_apNxWPzO4gC6CJ_LhY",
            authDomain: "chatroom-demo01.firebaseapp.com",
            databaseURL: "https://chatroom-demo01.firebaseio.com",
            projectId: "chatroom-demo01",
            storageBucket: "chatroom-demo01.appspot.com",
            messagingSenderId: "925426885449"
        };
        firebase.initializeApp(config);
        // 取得資料庫跟根目錄
        dataBase = firebase.database().ref();
        console.log('dataBase: ', dataBase);

    },
    mounted() {
        this.dialogueFrame = document.querySelector('#dialogueFrame');
        dataBase.child('/dialogue').on('value', (rawData) => {
            rawData.forEach(element => {
                // console.log('element.val().content: ', element.val().content);
                // console.log('element.val().content: ', element.val().timeStamp);
                // console.log('element.val().content: ', element.val().nickname);
                let content = element.val().content;
                let timeStamp = element.val().timeStamp;
                let nickname = element.val().nickname;
                if (!nickname) { return 0 }
                else if (nickname === this.yourself) {
                    this.dialogue += `<li class="${this.myStyle}">
                                        <span>
                                            ${nickname}| ${content}   
                                            <img src="./rabbit.jpg" alt=""/>  
                                        </span>
                                      </li> `;
                }
                else {
                    this.dialogue += `<li class="${this.otherStyle}"> 
                                        <span>
                                            <img src="./bear.jpg" alt=""/>    
                                            ${content}| ${nickname}                                    
                                        </span> 
                                      </li> `;
                }
            });
            this.dialogueFrame.innerHTML = this.dialogue;
            this.dialogue = '';
        })
    },
    methods: {
        sendMsg() {
            if (this.yourself !== '') {
                let now = new Date();
                let timeStamp = now.getTime();
                // console.log('now: ', now);
                // console.log('text.value: ', text.value);
                // console.log('timeStamp: ', timeStamp);
                let item = {
                    content: text.value,
                    timeStamp: timeStamp,
                    nickname: this.yourself,
                    times: JSON.stringify(now),
                }
                dataBase.child('/dialogue').push(item)

                // 清空輸入欄
                this.text = '';
            }
            else {
                alert('請輸入聊天暱稱')
            }
        }
    },
    computed: {
    }
});