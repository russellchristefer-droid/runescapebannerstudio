package com.bannerstudio;

import net.runelite.client.config.Config;
import net.runelite.client.config.ConfigGroup;
import net.runelite.client.config.ConfigItem;

@ConfigGroup("bannerstudio")
public interface BannerStudioConfig extends Config
{
	@ConfigItem(
		keyName = "deskUrl",
		name = "Desk URL",
		description = "Opens in your browser. Default is the live studio."
	)
	default String deskUrl()
	{
		return "https://runescapebannerstudio.grok.me/";
	}

	@ConfigItem(
		keyName = "overlayPath",
		name = "Overlay JPEG",
		description = "Optional local JPEG from the desk Download. Empty = no overlay."
	)
	default String overlayPath()
	{
		return "";
	}
}
