import { useEffect, useRef } from 'react';

const AD_ID = '69907926ce3e72c001469af9';

const AdBanner = () => {
	const adRef = useRef<HTMLDivElement>(null);
	const scriptLoaded = useRef(false);

	useEffect(() => {
		if (scriptLoaded.current) return;
		scriptLoaded.current = true;

		// Dynamically load the ad script
		(function loadAdScript(
			win: Window,
			doc: Document,
			tag: string,
			adId: string,
			hosts: string[],
			hostIndex: number,
			cacheBuster?: number
		) {
			const firstScript = doc.getElementsByTagName(tag)[0];
			const newScript = doc.createElement(tag) as HTMLScriptElement;
			newScript.async = true;
			newScript.src = `https://${hosts[hostIndex]}/js/${adId}.js?v=${cacheBuster || new Date().getTime()}`;
			newScript.onerror = function () {
				newScript.remove();
				const nextIndex = hostIndex + 1;
				if (nextIndex < hosts.length) {
					loadAdScript(win, doc, tag, adId, hosts, nextIndex);
				}
			};
			firstScript?.parentNode?.insertBefore(newScript, firstScript);
		})(window, document, 'script', AD_ID, ['cdn.bmcdn6.com'], 0, new Date().getTime());
	}, []);

	return (
		<div
			ref={adRef}
			className='flex items-center justify-center w-full py-6 md:py-10 overflow-hidden'
		>
			<ins
				className={AD_ID}
				style={{ display: 'inline-block', width: 728, height: 90 }}
			/>
		</div>
	);
};

export default AdBanner;
