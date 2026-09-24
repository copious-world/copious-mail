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





**FROM:**
https://www.youtube.com/watch?v=claxN4oxDuY

Chen, Wang & Qu (2026). "Recursive Self-Improvement in AI."
https://arxiv.org/abs/2607.07663

Zhang, Hu et al. (2025). "Darwin Gödel Machine."
https://arxiv.org/abs/2505.22954

Novikov, Vu et al. (2025). "AlphaEvolve."
https://arxiv.org/abs/2506.13131

Wijk, Lin et al. (2024). "RE-Bench."
https://arxiv.org/abs/2411.15114

Wen, Qiu et al. (2026). "Anthropic Automated Weak-to-Strong Researcher."
https://alignment.anthropic.com/2026/...

Kirgis, Kapoor, Narayanan et al. (2026). "Can AI Agents Conduct Open-Ended AI Research?"
https://arxiv.org/abs/2607.27191

Cunningham et al. (2026). "The Economics of Recursive Self-Improvement."
https://arxiv.org/abs/2609.15802

Burtsev (2026). "Recursive Criticality of AI Self-Improvement."
https://arxiv.org/abs/2609.00137

Google DeepMind (2026). "From AGI to ASI."
https://deepmind.google/research/publ...

International AI Safety Report (2026). "International AI Safety Report 2026."
https://internationalaisafetyreport.o...

OpenAI (2026). "Research Acceleration: A View Inside OpenAI."
https://openai.com/index/research-acc...

Grace et al. (2024). "Thousands of AI Authors on the Future of AI."
https://arxiv.org/abs/2401.02843
