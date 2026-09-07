package com.bannerstudio;

import com.google.inject.Provides;
import java.awt.image.BufferedImage;
import javax.inject.Inject;
import javax.swing.SwingUtilities;
import net.runelite.client.config.ConfigManager;
import net.runelite.client.plugins.Plugin;
import net.runelite.client.plugins.PluginDescriptor;
import net.runelite.client.ui.ClientToolbar;
import net.runelite.client.ui.NavigationButton;
import net.runelite.client.ui.overlay.OverlayManager;
import net.runelite.client.util.LinkBrowser;

@PluginDescriptor(
	name = "Banner Studio",
	description = "Opens the banner desk in a browser. Optional local JPEG overlay. Not a bot.",
	tags = {"banner", "stream", "overlay"}
)
public class BannerStudioPlugin extends Plugin
{
	@Inject
	private BannerStudioConfig config;
	@Inject
	private ClientToolbar toolbar;
	@Inject
	private OverlayManager overlays;
	@Inject
	private BannerStudioOverlay overlay;

	private NavigationButton button;

	@Override
	protected void startUp()
	{
		overlays.add(overlay);
		button = NavigationButton.builder()
			.tooltip("Open Banner Studio")
			.icon(new BufferedImage(16, 16, BufferedImage.TYPE_INT_RGB))
			.onClick(() -> SwingUtilities.invokeLater(() -> LinkBrowser.browse(config.deskUrl())))
			.build();
		toolbar.addNavigation(button);
	}

	@Override
	protected void shutDown()
	{
		overlays.remove(overlay);
		if (button != null)
		{
			toolbar.removeNavigation(button);
		}
	}

	@Provides
	BannerStudioConfig provideConfig(ConfigManager manager)
	{
		return manager.getConfig(BannerStudioConfig.class);
	}
}
