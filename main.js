((d) => {
    
    const $adviceButton = d.querySelector("[data-advice-button]");
    const $advice = d.querySelector("[data-advice]");

    const getData = async () => {

        $advice.insertAdjacentHTML("afterbegin", `
                <div class="loading">
                    <img src="images/spinning-circles.svg">
                </div>            
        `);

        try {
            const URL = "https://api.adviceslip.com/advice";
            let res = await fetch(URL);
            if(!res.ok) throw { status: res.status, statusText: res.statusText }
            
            if(res.ok) {
                let $loading = $advice.firstElementChild;
                $advice.removeChild($loading);
            }

            let json = await res.json();

            let { slip } = json;

            $advice.insertAdjacentHTML("afterbegin", `
                <p class="advice__number">advice # ${slip.id}</p>
                <h1 class="advice__text">${slip.advice}</h1>     
            `);
            
        }catch(err) {
            console.log(err);
            let msg = err.statusText || "Something Wrong!"
            $advice.insertAdjacentHTML("afterbegin", `
                <h1 class="advice__text"> 
                    <span class="error">Error ${err.status}:</span> 
                    ${msg}
                </h1>
            `);

        }
     
    }

    $adviceButton.addEventListener("click", e => {
        e.preventDefault();
        let num = $advice.children[0];
        let text = $advice.children[1];
        $advice.removeChild(num);
        $advice.removeChild(text);
        getData();
    });

    d.addEventListener("DOMContentLoaded", getData);

})(document);