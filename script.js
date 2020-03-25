window.addEventListener('load', init);


// Globals
let time = 20;
let score = 0;
let highestScore = 0;
let isPlaying;
let previousWord;
let word;
let loop = 0;
let maxTime = 30;

//DOM Elements
const wordInput = document.querySelector('#input');
const quoteDisplay = document.querySelector('#quote-display');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const highestScoreSpan = document.querySelector('#highest-score');

//array of sentences
const words = [ "echo 'hello';", 'form action="add.php" method="GET"', 
               "include 'footer.php';",
               "require 'header.php';", 
               "if(isset($_POST['buttonName'])){}",
               '$_GET is an array to store values from HTML forms',
               "htmlspecialchars($_POST['email'])",
               'if(empty($_POST)){}',
               'filter_var($email, FILTER_VALIDATE_EMAIL)',
               "preg_match('/^[a-zA-Z/s]+$/', $title)",
               "array_filter($errors)",
               "header('Location: index.php')",
               "$conn = mysqli_connect('localhost', 'khai', 'cat123', 'mydatabase');",
               "if(!$conn){echo mysqli_connect_error();}",
               "$sql = 'SELECT * FROM pizzas';",
               'mysqli_query($conn, $sql);',
               'mysqli_fetch_all($result, MYSQLI_ASSOC);',
               'print_r($pizzas);',
               'mysqli_free_result($result);',
               'mysqli_close($conn);',
               'foreach($pizzas as $pizza){}',
               'explode()',
               'implode()',
               'count()',
               'exit()',
               'file_put_contents()',
               'getenv()',
               'strip_tags()',
               'implode()',
               'str_replace()',
               'date()',
               'strlen()',
               'array_combine()',
               'array_multisort()',
               'array_unique()',
               'htmlentities()',
               'addslashes()',
               'stripslashes()',
               'mysqli_num_rows()',
               'mysqli_fetch_assoc()',
               "$_POST['login']",
               'include_once("db.php");',
               'mysqli_fetch_array($query);',
               "$db_password - $row['password']",
               'session_destroy()',
               '$connection = new mysqli($host, $user, $password);',
               'elseif()',
               'mysqli_real_escape_string()',
               'md5(rand(0,1000));',
               'or die();',
               'mysql_real_escape_string()',
               '$sql = "INSERT INTO pizzas() VALUES()";',
               'mysql_fetch_assoc()',
               "$val = $score = 40 ? 'high score!' : 'low score';",
               "echo $_SERVER['SERVER_NAME']",
               'unset();',
               'session_unset();',
               "$name = $_SESSION['name'] ?? 'Guest';",
               'setcookie() getcookie()',
               "$gender = $_COOKIE[] ?? 'Unknown';",
               'time() + 9999',
               "if(file_exists($file)){echo readfile($file);}",
               "copy($file, 'newfile.txt')",
               "echo realpath($file);",
               "rename($file, 'newfile.txt');",
               'mkdir() filesize()',
               "fopen($file, 'r+');",
               "fread(); fwrite();",
               "fgets(); fgetc()",
               "fclose($handle)",
               'unlink($file)',
               'class User{public $email; public $name;}',
               "$userOne = new User('Ted', 'ted@gmail.com');",
               'array_push()',
               'try{} catch(){}',
               'include_once() require_once()',
               'new PDO()',
               "new PDO('mysql:host=localhost;dbname=' . $db_name . ';charset-utf8', $db_user, $db_pass);",           
];
               
//   'JavaScript objects: Array, Date, Math, and String',
//   'eval()',
//   'parseInt()',
//   'parseFloat()',
//   'escape()', 
//   'unescape()',
//   'myArray = [0, 1, 2];',
//   'alert();',
//   'myString.lastIndexOf("e");',
//   'myString.substring(0,3);',
//   'myString.charAt(index)',
//   'myString.toLowerCase()',
//   'myString.toUpperCase()',
//   'myString.split()',
//   'Math.ceil()',
//   'Math.round()',
//   'Math.floor()',
//   'Math.min()',
//   'Math.max()',
//   'Math.random()',
//   'Math.sqrt()',
//   'let myBirthday = new date();',
//   'console.log(myBirthday.getHours());',
//   'myBirthday.setHours(7);',
//   'arr.length',
//   'arr.join()',
//   'arr.reverse()',
//   'arr.sort()',
//   'arr.filter()',
//   'arr.push() - adds items to the end',
//   'arr.pop() - extracts an item from the end',
//   'arr.shift() - extracts an item from the beginning',
//   'arr.unshift() - adds items to the beginning',
//   'delete arr[1];',
//   'arr.splice() - can insert, remove and replace elements',
//   'arr.slice() - returns part of the array in a new one',
//   'arr.concat() - creates a new array that includes other array',
//   'arr.forEach(function(item, index, array){})',
//   'arr.indexOf()',
//   'arr.lastIndexOf()',
//   'arr.includes()',
//   'arr.map()',
//   'arr.sort() - sorts the array',
//   'arr.reverse() - reverses the order of elements',
//   'str.split() - splits the string into an array of letters',
//   'arr.join() - joins items in an array',
//   'arr.reduce()',
//   'switch(x){case a: //code break; default: //code;}',
//   'let person = {name: Ted, age: 33};',
//   'let arr = [{name: Ted, age: 33}, {name: Ali, age: 23}];',
//   'JSON.stringify()',
//   'JSON.parse()',
//   'document.getElementById("content").innerHTML = "Hello";',
//   'if(){}else{};',
//   'btn.addEventListener("click", myFunction(){});',
//   'let myList = document.createElement("li");',
//   'document.getElementById("main-ul").getElementByTagName("ul")[0]',
//   'appendChild();',
//   'insertBefore()',
//   'games.forEach(function(game){console.log(game)}),
//   'async and await are similar to promises'


//initialize game
function init(){
   //load word from array
   renderNewQuote(words);
   //Start matching on word input
   wordInput.addEventListener('input', startMatch);
   //call countdown every time a new word appears
   setInterval(countDown, 1000);
   //constantly check status
   setInterval(checkStatus, 50);
}

//starts round
function startMatch(){
   if(matchWords()){
      isPlaying = true;
      time = time + 10;
      if(time > maxTime){
            time = maxTime;
         }
      renderNewQuote(words);
      wordInput.value = '';
      score++;
      loop = 0;
   }
   //Makes -1 show as 0
   if(score === -1){
      scoreDisplay.innerHTML = 0;
   } else{
      scoreDisplay.innerHTML = score;
   }
   
}

//checks if the words match
function matchWords(){
   if (wordInput.value == quoteDisplay.innerHTML){
      message.innerHTML = 'Correct!!!';
      return true;
   } else{
//      message.innerHTML = '';
      return false;
   }
}

function getRandomQuote(words){
   //gets a random number
   const randIndex = Math.floor(Math.random() * words.length);
   
   quoteDisplay.innerHTML = words[randIndex];
}

//Pick and show random word
function renderNewQuote(){
   //picks a random quote
   
   
   getRandomQuote(words);
   
   //avoids repeated words
   word = quoteDisplay.innerHTML; 
   if(previousWord == word){
      renderNewQuote(words);
      }
   else{
      previousWord = quoteDisplay.innerHTML;
   }
}

function countDown(){
   if(time>0 && isPlaying){
      //decrement
      time--;
   }else if(time === 0){
      //game is over
      isPlaying = false;
   }
   //show time
   timeDisplay.innerHTML = time;
}

function checkStatus(){
   if(!isPlaying && time === 0){   
      //saves the highest score
      if(score > highestScore){
            highestScore = score;
            highestScoreSpan.innerHTML = highestScore;
            time = 20;
         };
      //tells you what you scored that turn
       if(loop<1){
         message.innerHTML = 'Game Over ' + 'you scored: ' + score; 
         loop++;
      }
      score = -1;
      }
}



//TO Do

// create more arrays of words. Each array will have it's own difficulty. As you progress in the game the harder array will be used. 

//I want to create a counter to count how many words have been input so that after a certain amount of words the array will change to a more difficult one.

//make it so that mistakes are shown as a different color.

//Make it so that your maxTime can increase as a reward from your highest score.

//Make it so that the amount of time that you are rewarded depends on how many characters the phrase contains.






















