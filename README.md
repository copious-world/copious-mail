# copious-mail
This an interface for mail for a user. This is for reading, sending, editing, etc. It should work with more than one back-end and may have unconventional features as bonuses. The interface should be responsive and optionally work within a human-frame.




## alien signals
https://github.com/stackblitz/alien-signals



## mikado usage

DOC IS HERE:

https://github.com/nextapps-de/mikado

npx mikado-compile ./tpl/


```
<!-- root view -->
<tweets foreach="data.tweets">
  <!-- new partial template -->
  <tweet>
    <h1>{{ data.title }}</h1>
    <title>Comments:</title>
    <div foreach="data.comments">
      <!-- new partial template -->
      <comment>
        <p>{{ data.content }}</p>
        <title>Replies:</title>
        <div foreach="data.replies">
          <!-- new partial template -->
          <p>{{ data.content }}</p>
        </div>
      </comment>
    </div>
  </tweet>
</tweets>
```
