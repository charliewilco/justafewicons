const ICONS = [
	"addnew",
	"alert",
	"audio",
	"bell",
	"camera",
	"cameralens",
	"categories",
	"chart",
	"checkmark",
	"clock",
	"close",
	"cloud",
	"compose",
	"document",
	"eye",
	"gear-hex",
	"gear",
	"gears-group",
	"greenranger",
	"home",
	"lightbulb",
	"link",
	"locationpin",
	"logout",
	"mail",
	"menu",
	"messaging",
	"microphone",
	"night",
	"oldkey",
	"paragraph",
	"pen",
	"picture",
	"pie-chart",
	"podcast",
	"randomize",
	"rocket",
	"search",
	"server",
	"sharing",
	"sharingalt",
	"sunlight",
	"sync",
	"tools",
	"unlock",
	"wifi"
];

const svgCache = new Map();

function fileNameForIcon(name) {
	return `jf--icon_${name}.svg`;
}

function pathForIcon(name) {
	return `icons/${fileNameForIcon(name)}`;
}

function componentSnippet(name) {
	return `<jafi-icon name="${name}"></jafi-icon>`;
}

function imageSnippet(name) {
	return `<img src="${pathForIcon(name)}" alt="">`;
}

function escapeHtml(value) {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;");
}

async function copyText(value) {
	if (navigator.clipboard?.writeText) {
		await navigator.clipboard.writeText(value);
		return;
	}

	const field = document.createElement("textarea");
	field.value = value;
	field.setAttribute("readonly", "");
	field.style.position = "fixed";
	field.style.inset = "0 auto auto 0";
	field.style.opacity = "0";
	document.body.append(field);
	field.select();
	document.execCommand("copy");
	field.remove();
}

async function readIconSvg(name) {
	const path = pathForIcon(name);

	if (!svgCache.has(path)) {
		svgCache.set(path, fetch(path).then((response) => {
			if (!response.ok) {
				throw new Error(`Could not load ${path}`);
			}

			return response.text();
		}));
	}

	return svgCache.get(path);
}

class JafiIcon extends HTMLElement {
	static observedAttributes = ["name"];

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.renderVersion = 0;
	}

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback() {
		if (this.isConnected) {
			this.render();
		}
	}

	async render() {
		const name = this.getAttribute("name");
		const version = ++this.renderVersion;
		const style = document.createElement("style");

		style.textContent = `
				:host {
					width: var(--icon-size, 4rem);
					height: var(--icon-size, 4rem);
					display: inline-grid;
					place-items: center;
					color: var(--icon-color, currentColor);
				}

				svg {
					width: 100%;
					height: 100%;
					display: block;
				}

				svg,
				svg * {
					fill: currentColor !important;
				}
		`;
		this.shadowRoot.replaceChildren(style);

		if (!name) {
			return;
		}

		try {
			const source = await readIconSvg(name);

			if (this.renderVersion !== version || this.getAttribute("name") !== name) {
				return;
			}

			const document = new DOMParser().parseFromString(source, "image/svg+xml");
			const svg = document.documentElement;

			svg.removeAttribute("id");
			svg.removeAttribute("width");
			svg.removeAttribute("height");
			svg.setAttribute("aria-hidden", "true");
			svg.setAttribute("focusable", "false");

			this.shadowRoot.replaceChildren(style, svg);
		} catch {
			if (this.renderVersion === version) {
				this.shadowRoot.replaceChildren(style);
			}
		}
	}
}

class IconGallery extends HTMLElement {
	constructor() {
		super();
		this.query = "";
		this.selectedIcon = ICONS[0];
	}

	connectedCallback() {
		this.render();
	}

	get filteredIcons() {
		const normalizedQuery = this.query.trim().toLowerCase();

		if (!normalizedQuery) {
			return ICONS;
		}

		return ICONS.filter((icon) => icon.includes(normalizedQuery));
	}

	render() {
		const icons = this.filteredIcons;

		this.innerHTML = `
			<section class="gallery">
				<header class="sidebar">
					<div class="sidebar-scroll">
						<div class="brand">
							<jafi-icon class="brand-mark" name="rocket"></jafi-icon>
							<h1>Just a Few Icons</h1>
							<p>SVG Icons With Some Style</p>
						</div>

						<div class="field">
							<label for="icon-search">Find an icon</label>
							<input class="search-input" id="icon-search" type="search" value="${this.query}" autocomplete="off" placeholder="Search ${ICONS.length} icons">
						</div>

						<section class="sidebar-section">
							<h2>Using the Icons</h2>
							<p>Use the SVG files directly, or use the tiny web component on this page to inline them by name.</p>
							<code class="snippet">${escapeHtml(componentSnippet(this.selectedIcon))}</code>
							<div class="copy-actions">
								<button class="copy-button" type="button" data-copy="${escapeHtml(componentSnippet(this.selectedIcon))}">Copy tag</button>
								<button class="copy-button" type="button" data-copy="${escapeHtml(imageSnippet(this.selectedIcon))}">Copy img</button>
							</div>
						</section>

						<footer class="site-footer">
							<span>${ICONS.length} icons</span>
							<a href="https://github.com/charlespeters/justafewicons">GitHub</a>
						</footer>
					</div>
				</header>

				<section class="content">
					<header class="content-header">
						<div>
							<h2>Icon Set</h2>
							<div class="count">${icons.length} shown</div>
						</div>
					</header>

					<div class="grid">
						${icons.length ? icons.map((icon) => this.renderIconCard(icon)).join("") : `<p class="empty">No matching icons.</p>`}
					</div>
				</section>
			</section>
		`;

		this.bindEvents();
	}

	renderIconCard(icon) {
		return `
			<button class="icon-card" type="button" data-icon="${icon}" aria-pressed="${icon === this.selectedIcon}">
				${this.renderNewBadge(icon)}
				<span class="icon-preview">
					<jafi-icon name="${icon}"></jafi-icon>
				</span>
				<span class="icon-card-name">#${icon}</span>
			</button>
		`;
	}

	renderNewBadge(icon) {
		const newerIcons = new Set(["gears-group", "pie-chart", "bell", "paragraph", "rocket", "logout"]);

		return newerIcons.has(icon) ? `<span class="new-badge">New</span>` : "";
	}

	bindEvents() {
		this.querySelector("#icon-search")?.addEventListener("input", (event) => {
			this.query = event.target.value;
			this.render();
			this.querySelector("#icon-search")?.focus();
		});

		this.querySelectorAll("[data-icon]").forEach((button) => {
			button.addEventListener("click", () => {
				this.selectedIcon = button.dataset.icon;
				this.render();
			});
		});

		this.querySelectorAll("[data-copy]").forEach((button) => {
			button.addEventListener("click", async () => {
				try {
					await copyText(button.dataset.copy);
					button.textContent = "Copied";
					setTimeout(() => {
						button.textContent = button.dataset.copy.startsWith("<img") ? "Copy img" : "Copy tag";
					}, 1200);
				} catch {
					button.textContent = "Copy failed";
				}
			});
		});
	}
}

customElements.define("jafi-icon", JafiIcon);
customElements.define("icon-gallery", IconGallery);
